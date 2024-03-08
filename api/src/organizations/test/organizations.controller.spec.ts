import { Test } from "@nestjs/testing";
import { OrganizationsController } from "../organizations.controller";
import { OrganizationsService } from "../organizations.service";
import { organizationStub } from "./stubs/organization.stub";
import { Organization } from "../schemas/organizations.schema";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../dto/organizations.dto";

jest.mock("../organizations.service");

describe('OrganizationsController', () => {
  let organizationsController: OrganizationsController;
  let organizationsService: OrganizationsService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [OrganizationsController],
      providers: [OrganizationsService],
    }).compile(); 

    organizationsController = module.get<OrganizationsController>(OrganizationsController);
    organizationsService = module.get<OrganizationsService>(OrganizationsService);
    jest.clearAllMocks();
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let organizations: Organization[]

      beforeEach(async () => {
        organizations = await organizationsController.findAll()
      })

      test('then it should call organizationsService', () => {
        expect(organizationsService.findAll).toHaveBeenCalled();
      });

      test('then it should return an array of organizations', () => {
        expect(organizations).toEqual([organizationStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let organization: Organization

      beforeEach(async () => {
        organization = await organizationsController.findOne(organizationStub()._id as unknown as string)
      })

      test('then it should call organizationsService', () => {
        expect(organizationsService.findOne).toHaveBeenCalledWith(organizationStub()._id as unknown as string);
      });

      test('then it should return a organization', () => {
        expect(organization).toEqual(organizationStub());
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let organization: Organization
      let createOrganizationDto: CreateOrganizationDto

      beforeEach(async () => {
        createOrganizationDto = {
          name: organizationStub().name,
        }
        organization = await organizationsController.create(createOrganizationDto)
      })

      test('then it should call organizationsService', () => {
        expect(organizationsService.create).toHaveBeenCalledWith(createOrganizationDto);
      });

      test('then it should return a organization', () => {
        expect(organization).toEqual(organizationStub());
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let organization: Organization
      let updateOrganizationDto: UpdateOrganizationDto

      beforeEach(async () => {
        updateOrganizationDto = {
          name: 'Other Name',
        }
        organization = await organizationsController.update(organizationStub()._id as unknown as string, updateOrganizationDto)
      })

      test('then it should call organizationsService', () => {
        expect(organizationsService.update).toHaveBeenCalledWith(organizationStub()._id as unknown as string, updateOrganizationDto);
      });

      test('then it should return a organization', () => {
        expect(organization).toEqual(organizationStub());
      });
    });
  })
});