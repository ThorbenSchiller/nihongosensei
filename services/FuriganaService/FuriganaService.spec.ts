import { FuriganaService } from "./FuriganaService";
import { Kuroshiro } from "./kuroshiro";

describe("FuriganaService", () => {
  it("should not be initialized upon creation", () => {
    const kuroshiroMock: Kuroshiro = {
      convert: jest.fn(),
      init: jest.fn(),
    };
    const analyzerFactoryMock = jest.fn();

    const furiganaService = new FuriganaService(
      kuroshiroMock,
      analyzerFactoryMock
    );

    expect(furiganaService.isInitialized()).toEqual(false);
    expect(analyzerFactoryMock).toBeCalledTimes(0);
  });

  it("should pass the correct text value to the analyzer", async () => {
    const kuroshiroMock: Kuroshiro = {
      convert: jest.fn().mockReturnValue([]),
      init: jest.fn(),
    };
    const analyzerMock = {};
    const analyzerFactoryMock = jest.fn().mockReturnValue(analyzerMock);
    const text = "foo";

    const furiganaService = new FuriganaService(
      kuroshiroMock,
      analyzerFactoryMock
    );

    await furiganaService.getFurigana(text);

    expect(analyzerFactoryMock).toBeCalledTimes(1);
    expect(kuroshiroMock.init).toBeCalledTimes(1);
    expect(kuroshiroMock.init).toBeCalledWith(analyzerMock);
    expect(kuroshiroMock.convert).toBeCalledTimes(1);
    expect(kuroshiroMock.convert).toBeCalledWith(text);
  });

  it("should call the analyzer factory only once", async () => {
    const kuroshiroMock: Kuroshiro = {
      convert: jest.fn().mockReturnValue([]),
      init: jest.fn(),
    };
    const analyzerFactoryMock = jest.fn();

    const furiganaService = new FuriganaService(
      kuroshiroMock,
      analyzerFactoryMock
    );

    await furiganaService.getFurigana("foo");

    expect(furiganaService.isInitialized()).toEqual(true);

    await furiganaService.getFurigana("bar");

    expect(furiganaService.isInitialized()).toEqual(true);
    expect(analyzerFactoryMock).toBeCalledTimes(1);
  });
});
