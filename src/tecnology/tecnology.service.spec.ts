import { TecnologyService } from './tecnology.service';
import { CreateTecnologyDto } from './dto/create-tecnology.dto';
import { BadRequestException } from '@nestjs/common';

describe('TecnologyService', () => {
  let tecnologyService: TecnologyService;

  const mockTecnologyRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  beforeEach(() => {
    tecnologyService = new TecnologyService(mockTecnologyRepository as any);
  });

  it('should be defined', () => {
    expect(tecnologyService).toBeDefined();
  });

  it('should create a new technology', async () => {
    const createTecnologyDto: CreateTecnologyDto = {
      tecName: 'Test Technology',
      creatorsName: 'Test Creators',
    };

    const createdTecnology = { ...createTecnologyDto, id: 1 };
    mockTecnologyRepository.save.mockResolvedValue(createdTecnology);

    const result = await tecnologyService.create(createTecnologyDto);

    expect(result).toEqual(createdTecnology);
    expect(mockTecnologyRepository.save).toHaveBeenCalledWith(
      createTecnologyDto,
    );
  });

  it('should find one technology by ID', async () => {
    const tecnologyId = 1;
    const foundTecnology = { id: tecnologyId, tecName: 'Test Technology' };
    mockTecnologyRepository.findOne.mockResolvedValue(foundTecnology);

    const result = await tecnologyService.findOne(tecnologyId);

    expect(result).toEqual(foundTecnology);
    expect(mockTecnologyRepository.findOne).toHaveBeenCalledWith(tecnologyId);
  });

  it('should update a technology', async () => {
    const tecnologyId = 1;
    const updatedData = { tecName: 'Updated Technology' };
    const foundTecnology = { id: tecnologyId, tecName: 'Test Technology' };
    mockTecnologyRepository.findOne.mockResolvedValue(foundTecnology);
    mockTecnologyRepository.update.mockResolvedValue({ affected: 1 });

    const result = await tecnologyService.update(tecnologyId, updatedData);

    expect(result).toEqual({ ...foundTecnology, ...updatedData });
    expect(mockTecnologyRepository.findOne).toHaveBeenCalledWith(tecnologyId);
    expect(mockTecnologyRepository.update).toHaveBeenCalledWith(
      tecnologyId,
      updatedData,
    );
  });

  it('should delete a technology', async () => {
    const tecnologyId = 1;
    const foundTecnology = { id: tecnologyId, tecName: 'Test Technology' };
    mockTecnologyRepository.findOne.mockResolvedValue(foundTecnology);
    mockTecnologyRepository.remove.mockResolvedValue({ affected: 1 });

    const result = await tecnologyService.delete(tecnologyId);

    expect(result).toEqual({
      success: true,
      message: `The tecnology with id ${tecnologyId} was successfully deleted`,
    });
    expect(mockTecnologyRepository.findOne).toHaveBeenCalledWith(tecnologyId);
    expect(mockTecnologyRepository.remove).toHaveBeenCalledWith(foundTecnology);
  });

  it('should find technologies by name', async () => {
    const tecName = 'Test';
    mockTecnologyRepository.getMany.mockResolvedValue([]);

    const result = await tecnologyService.findByName(tecName);

    expect(result).toEqual([]);
    expect(mockTecnologyRepository.createQueryBuilder).toHaveBeenCalledWith(
      'tecnology',
    );
    expect(mockTecnologyRepository.where).toHaveBeenCalledWith(
      'LOWER(tecnology.tecName) ILIKE :tecName',
      {
        tecName: `%${tecName.toLowerCase()}%`,
      },
    );
    expect(mockTecnologyRepository.getMany).toHaveBeenCalled();
  });

  it('should throw BadRequestException if tecName is not provided when finding by name', async () => {
    try {
      await tecnologyService.findByName('');
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
