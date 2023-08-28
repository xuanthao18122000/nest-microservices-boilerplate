// import {
//   Controller,
//   Post,
//   UseInterceptors,
//   UploadedFile,
//   Body,
//   ParseFilePipeBuilder,
//   Get,
// } from "@nestjs/common";
// import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
// import { MediafilesService } from "./file.service";
// import { FileInterceptor } from "@nestjs/platform-express";
// import { MediafileInterface } from "src/common/interfaces/mediafile-variants.interface";
// import { cfg } from "src/config/env.config";

// @ApiTags("Files")
// @Controller("files")
// @ApiBearerAuth()
// export class MediafilesController {
//   constructor(private readonly mediafilesService: MediafilesService) {}
//   @Post("upload")
//   @ApiConsumes("multipart/form-data")
//   @ApiBody({
//     schema: {
//       type: "object",
//       properties: {
//         file: {
//           type: "string",
//           format: "binary",
//         },
//       },
//     },
//   })
//   @UseInterceptors(FileInterceptor("file"))
//   async uploadFile(
//     @UploadedFile(
//       new ParseFilePipeBuilder()
//         .addMaxSizeValidator({ maxSize: 100 * 1024 * 1024 })
//         .build({
//           fileIsRequired: true,
//         })
//     )
//     file: Express.Multer.File
//   ) {
//     let input: MediafileInterface = this.mediafilesService.buildMediafile(file);

//     if (input.mimeType.includes("image")) {
//       input.variants = this.mediafilesService.buildImageVariants();
//     }
//     // upload

//     try {
//       input = await this.mediafilesService.buildUpload(input, file);
//     } catch (error) {
//       throw error;
//     }
//     try {
//       await this.mediafilesService.saveToDatabase(input);
//     } catch (error) {
//       throw error;
//     }

//     return {
//       link: `${cfg("FILE_CDN_URL")}/${input.id}.${input.extension}`,
//       fileUpload: `${input.id}.${input.extension}`,
//       ...input,
//     };
//   }
// }
