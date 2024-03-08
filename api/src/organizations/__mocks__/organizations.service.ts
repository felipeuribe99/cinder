import { organizationStub } from "../test/stubs/organization.stub";

export const OrganizationsService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(organizationStub()),
  findAll: jest.fn().mockResolvedValue([organizationStub()]),
  findOne: jest.fn().mockResolvedValue(organizationStub()),
  update: jest.fn().mockResolvedValue(organizationStub())
});