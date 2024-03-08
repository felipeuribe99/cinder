import { Test } from "@nestjs/testing";
import { OrganizationsService } from "../organizations.service";
import { getModelToken } from "@nestjs/mongoose";
import { Organization } from "../schemas/organizations.schema";
import { organizationStub } from "./stubs/organization.stub";
import { Model } from "mongoose";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../dto/organizations.dto";


describe('OrganizationsService', () => {
  let organizationsService: OrganizationsService;
  let organizationModel: Model<Organization>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getModelToken(Organization.name),
          useValue: mockOrganizationModel,
        }
      ],
    }).compile();

    organizationsService = module.get<OrganizationsService>(OrganizationsService);
    organizationModel = module.get<Model<Organization>>(getModelToken(Organization.name));
  });

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let organizations: Organization[];

      beforeEach(async () => {
        organizations = await organizationsService.findAll();
      });

      test('then it should call the organizationModel', () => {
        expect(organizationModel.find).toHaveBeenCalled();
      });

      test('then it should return an array of organizations', () => {
        expect(organizations).toEqual([organizationStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let organization: Organization;

      beforeEach(async () => {
        organization = await organizationsService.findOne(organizationStub()._id as unknown as string);
      });

      test('then it should call the organizationModel', () => {
        expect(organizationModel.findById).toHaveBeenCalledWith(organizationStub()._id);
      });

      test('then it should return a organization', () => {
        expect(organization).toEqual(organizationStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let organization: Organization;
      let createOrganizationDto: CreateOrganizationDto

      beforeEach(async () => {
        createOrganizationDto = {
          name: organizationStub().name,
        }
        organization = await organizationsService.create(createOrganizationDto);
      });

      test('then it should call the organizationModel', () => {
        expect(organizationModel.create).toHaveBeenCalledWith(createOrganizationDto);
      });

      test('then it should return a organization', () => {
        expect(organization).toEqual(organizationStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let organization: Organization;
      let updateOrganizationDto: UpdateOrganizationDto

      beforeEach(async () => {
        updateOrganizationDto = {
          name: "Other Name",
        }
        organization = await organizationsService.update(organizationStub()._id as unknown as string, updateOrganizationDto);
      });

      test('then it should call the organizationModel', () => {
        expect(organizationModel.findByIdAndUpdate).toHaveBeenCalledWith(organizationStub()._id, updateOrganizationDto, { new: true });
      });

      test('then it should return a organization', () => {
        expect(organization).toEqual({
          ...organizationStub(),
          ...updateOrganizationDto
        });
      });
    });
  });
})

const mockOrganizationModel = {
  find: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue([organizationStub()]),
  })),
  findById: jest.fn().mockImplementation((id) => ({
    exec: jest.fn().mockResolvedValue(organizationStub()),
  })),
  findByIdAndUpdate: jest.fn().mockImplementation((id, updateOrganizationDto) => ({
    exec: jest.fn().mockResolvedValue({ ...organizationStub(), ...updateOrganizationDto }),
  })),
  create: jest.fn().mockResolvedValue(organizationStub()),
};