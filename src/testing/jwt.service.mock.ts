import { JwtService } from "@nestjs/jwt"
import { accessToken } from "./acess-token.mock"

export const JwtServiceMock = {
    provide : JwtService,
    useValue : {
        signAsync : jest.fn().mockResolvedValue(accessToken)
    }
}