import { FuriganaService } from "./FuriganaService";
import { Kuroshiro } from "./kuroshiro";

describe("FuriganaService", () => {
  it("should pass the correct text value to the analyzer", async () => {
    const kuroshiroMock: Kuroshiro = {
      convert: jest.fn().mockReturnValue([]),
    } as never;
    const text = "foo";

    const furiganaService = new FuriganaService(kuroshiroMock);

    await furiganaService.getFurigana(text);

    expect(kuroshiroMock.convert).toBeCalledTimes(1);
    expect(kuroshiroMock.convert).toBeCalledWith(text);
  });
});
