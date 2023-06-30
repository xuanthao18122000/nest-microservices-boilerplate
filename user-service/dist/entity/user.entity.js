"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
let User = exports.User = class User extends base_entity_1.BaseEntity {
    constructor(data = null) {
        if (data) {
            super();
            this.id = data.id || null;
            this.email = data.email;
            this.address = data.address;
            this.fullName = data.fullName;
            this.phoneNumber = data.phoneNumber;
            this.gender = data.gender;
            this.status = data.status;
        }
    }
    serialize() {
        return {
            id: this.id,
            email: this.email,
            fullName: this.fullName,
            phoneNumber: this.phoneNumber,
            gender: this.gender,
            status: this.status,
        };
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', default: '123456a@' }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'full_name' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'phone_number', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', default: { list: [] }, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "logs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: -1 }),
    __metadata("design:type", Number)
], User.prototype, "status", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    __metadata("design:paramtypes", [Object])
], User);
//# sourceMappingURL=user.entity.js.map