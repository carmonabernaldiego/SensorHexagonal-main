import UUIDService from "../../../src/Auth/Infrastructure/Helpers/UUIDService";

describe("UUIDService", () => {
  test("CP19 - Genera UUID v4 válido", () => {
    const service = new UUIDService();
    const uuid = service.get_uuid();

    // UUID v4 regex
    const regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(regex.test(uuid)).toBe(true);
  });
});
