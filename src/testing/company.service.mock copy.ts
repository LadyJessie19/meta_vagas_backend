import { CompanyService } from "../company/company.service";
import { companyCreatedMock } from "./company-created.mock";


export const CompanyServiceMock = {
    provide : CompanyService,
    useValue: {
        create: jest.fn().mockReturnValue(companyCreatedMock),
        findOne: jest.fn().mockResolvedValue(companyCreatedMock),
        findAll: jest.fn().mockResolvedValue([companyCreatedMock]),
        update: jest.fn().mockResolvedValue(companyCreatedMock),
        delete: jest.fn().mockResolvedValue(companyCreatedMock),
      },
}