// import { Module } from "@nestjs/common";
// import { TypeOrmModule } from "@nestjs/typeorm";

// // import FilterableService from '../../share/filter.service';
// import { Mediafile } from "src/database/entities";
// import { MediafilesController } from "./file.controller";
// import { MediafilesService } from "./file.service";
// import { UploadServiceProvider } from "src/common/providers/upload/upload.service.provider";

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Mediafile]),
//     UploadServiceProvider.forRoot(),
//   ],

//   controllers: [MediafilesController],
//   providers: [MediafilesService, UploadServiceProvider],
// })
// export class FilesModule {}
