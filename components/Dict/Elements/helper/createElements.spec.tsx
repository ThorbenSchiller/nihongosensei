import { render } from "@testing-library/react";
import React from "react";
import { createElements } from "./createElements";

describe("createElements", () => {
  it("should not create a whitespace before a bracket for expl", () => {
    const transAndBracketAndDef = [
      {
        _element: "TransType",
        usgAndTrAndDef: [
          {
            _element: "TrComplexType",
            textAndTokenAndDef: [{ value: "foo", _element: "TextType" }],
          },
        ],
      },
      {
        _element: "ExplType",
        textAndLiteralAndTransl: [
          {
            value: "bar",
            _element: "TextType",
          },
        ],
      },
    ];

    const screen = render(<>{createElements(transAndBracketAndDef)}</>);
    const text = screen.baseElement.textContent;

    expect(text).toEqual("foo (bar)");
  });

  it("should group multiple expl correctly", () => {
    const transAndBracketAndDef = [
      {
        _element: "ExplType",
        textAndLiteralAndTransl: [
          {
            value: "foo",
            _element: "TextType",
          },
        ],
      },
      {
        _element: "ExplType",
        textAndLiteralAndTransl: [
          {
            value: "bar",
            _element: "TextType",
          },
        ],
      },
    ];

    const screen = render(<>{createElements(transAndBracketAndDef)}</>);
    const text = screen.baseElement.textContent;

    expect(text).toEqual("(foo; bar)");
  });

  it("should create the text correctly with a bracket", () => {
    const transAndBracketAndDef = [
      {
        _element: "TransType",
        usgAndTrAndDef: [
          {
            _element: "TrComplexType",
            textAndTokenAndDef: [
              {
                _element: "BracketType",
                defAndExplAndBirthdeath: [
                  {
                    _element: "ExplType",
                    textAndLiteralAndTransl: [
                      { value: "Beiname f.", _element: "TextType" },
                    ],
                  },
                ],
              },
              {
                type: "N",
                genus: "M",
                content: "Ugui",
                _element: "TokenType",
              },
              {
                _element: "BracketType",
                defAndExplAndBirthdeath: [
                  {
                    _element: "ExplType",
                    textAndLiteralAndTransl: [
                      {
                        value: "siehe japan.",
                        _element: "TextType",
                        hasFollowingSpace: true,
                      },
                      { content: ["ugui"], _element: "TranscrType" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        _element: "TransType",
        langdesc: "scientific",
        usgAndTrAndDef: [
          {
            _element: "TrComplexType",
            textAndTokenAndDef: [
              { value: "Tribolodon hakonensis", _element: "TextType" },
            ],
          },
        ],
      },
    ];

    const screen = render(<>{createElements(transAndBracketAndDef)}</>);
    const text = screen.baseElement.textContent;

    expect(text).toEqual(
      "(Beiname f.) Ugui m (siehe japan. ugui); Tribolodon hakonensis",
    );
  });

  it("should only create one bracket", () => {
    const elements = [
      {
        _element: "BracketType",
        defAndExplAndBirthdeath: [
          {
            _element: "ExplType",
            textAndLiteralAndTransl: [
              { value: "einen Ort", _element: "TextType" },
            ],
          },
        ],
      },
      { value: "verlassen", _element: "TextType", hasPrecedingSpace: true },
    ];

    const screen = render(<>{createElements(elements)}</>);
    const text = screen.baseElement.textContent;

    expect(text).toEqual("(einen Ort) verlassen");
  });

  it("should combine following def and expl elements", () => {
    const elements = [
      {
        _element: "DefType",
        textAndLiteralAndTransl: [
          {
            value:
              "spielerische Form der Teezeremonie der Ura Senke zurückgehend auf Gengensai",
            _element: "TextType",
          },
        ],
      },
      {
        _element: "ExplType",
        textAndLiteralAndTransl: [
          {
            value: "Bestimmung der jeweiligen Rolle durch Kartenziehen",
            _element: "TextType",
          },
        ],
      },
      {
        _element: "ExplType",
        textAndLiteralAndTransl: [
          {
            value:
              "Schnee erlaubt das Süßigkeitenessen, Mond erlaubt das Teetrinken und die Blüte erfordert die Teebereitung",
            _element: "TextType",
          },
        ],
      },
    ];

    const screen = render(<>{createElements(elements)}</>);
    const text = screen.baseElement.textContent;

    expect(text).toEqual(
      "(spielerische Form der Teezeremonie der Ura Senke zurückgehend auf Gengensai; Bestimmung der jeweiligen Rolle durch Kartenziehen; Schnee erlaubt das Süßigkeitenessen, Mond erlaubt das Teetrinken und die Blüte erfordert die Teebereitung)",
    );
  });
});
