import {Exclude} from "@nestjs/class-transformer";
import {UserEntity} from "../../users/entity/user.entity";

@Exclude()
export class ProfessorEntity extends UserEntity {

}