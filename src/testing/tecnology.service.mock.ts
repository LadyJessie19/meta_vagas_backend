import { TecnologyService } from "../tecnology/tecnology.service";
import { tecnlogyCreatedMock } from "./tecnology-found.mock";

export const TecnologyServiceMock = {
    provide : TecnologyService,
    useValue: {
        create: jest.fn().mockReturnValue(tecnlogyCreatedMock),
        findOne: jest.fn().mockResolvedValue(tecnlogyCreatedMock),
        findAll: jest.fn().mockResolvedValue([tecnlogyCreatedMock]),
        update: jest.fn().mockResolvedValue(tecnlogyCreatedMock),
        delete: jest.fn().mockResolvedValue(tecnlogyCreatedMock),
        findByName: jest.fn().mockResolvedValue(tecnlogyCreatedMock),
      },
}