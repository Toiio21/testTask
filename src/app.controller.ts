import { Controller, Get, Put, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiBody, ApiExtraModels } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Item } from './model/item.entity';
import { Reservation } from './model/reservation.entity';

@ApiExtraModels(Reservation)

@Controller()
export class AppController {

    constructor(private readonly appService: AppService) {}

    asUUID( path: string = '' ){ return path.replace(/[^A-Z0-9-]/ig, ''); }
    
    @Post('rest-api/reservation/:id')
    @ApiOperation({ summary: 'Бронь комнаты' })
    @ApiParam({name: 'id', required: true, type: String})
    @ApiQuery({name: 'beginning', required: true, type: Date})
    @ApiQuery({name: 'completion', required: true, type: Date})
    @ApiBody({required: false, type: [ String ] })

    public async reservationHotelFloorsRooms(
        @Body() postData: string[],
        @Query( 'beginning' ) beginning: string,
        @Query( 'completion' ) completion: string,
        @Param('id') uuid: string
    ) {
        return this.appService.reservationHotelFloorRoom({
            pid: this.asUUID( uuid ),
            beginning: new Date( beginning ),
            completion: new Date( completion ),
            internalComment: postData[0]
        });
    }

    @Get('rest-api/reservation/:id')
    @ApiOperation({ summary: 'Текущие забронированные номера или этажи' })
    @ApiParam({name: 'id', required: true, type: String})

    public async reservationHotelFloorsRoomsActive(
        @Param('id') uuid: string
    ) {
        return this.appService.reservationHotelFloorsRoomsActive( this.asUUID( uuid ) );
    }
    
    @Get('rest-api/:floor?/:room?')
    @ApiOperation({ summary: 'получение информации о комнате или этаже' })
    @ApiParam({name: 'floor', required: false, type: String})
    @ApiParam({name: 'room', required: false, type: String})

    public async getHotelFloorsRooms(
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        if ( this.asUUID( room ) ) { return this.appService.getHotelFloorRoom( this.asUUID( floor ), this.asUUID( room ) ); }
        if ( this.asUUID( floor ) ) { return this.appService.getHotelFloorRooms( this.asUUID( floor ) ); }
        else { return this.appService.getHotelFloors(); }
    }

    @Post('rest-api/:floor/:room?')
    @ApiOperation({ summary: 'Обновление информации о комнате' })
    @ApiParam({name: 'floor', required: true, type: String})
    @ApiParam({name: 'room', required: false, type: String})

    public async updateHotelFloorsRooms(
        @Body() postData: Item,
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        return this.appService.updateHotelFloorRoom( postData,  this.asUUID( room ) || this.asUUID( floor ) );
    }

    @Put('rest-api/:floor')
    @ApiOperation({ summary: 'Создание комнаты на этаже' })
    @ApiParam({name: 'floor', required: false, type: String})

    public async createHotelFloorsRooms(
        @Body() postData: Item,
        @Param('floor') floor: string
    ) {
        return this.appService.createHotelFloorRoom({ ...postData, pid: this.asUUID( floor ) });
    }

    @Delete('rest-api/:floor/:room?')
    @ApiOperation({ summary: 'Удаление комнаты' })
    @ApiParam({name: 'floor', required: true, type: String})
    @ApiParam({name: 'room', required: false, type: String})
    
    public async deleteHotelFloorsRooms(
        @Param('floor') floor: string,
        @Param('room') room: string
    ) {
        return this.appService.deleteHotelFloorRoom( this.asUUID( room ) || this.asUUID( floor ) );
    }

    @Get(':floor?/:room?')
    @ApiOperation({ summary: 'Администратор' })
    getAdminState(): string {
        return this.appService.getAdminState();
    }
}
