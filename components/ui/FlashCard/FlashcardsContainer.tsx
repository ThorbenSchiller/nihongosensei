import { getRandomEntry } from "@components/ui/FlashCard/helper";
import { VocabularyListModel } from "@services/VocabularyListService";
import { EntryModel } from "@services/VocabularyService";
import React, { useEffect, useReducer } from "react";
import { FlashcardContainer } from "./FlashcardContainer";
import styles from "./FlashcardsContainer.module.css";

export type FlashcardsContainerProps = {
  list: VocabularyListModel;
  entries: ReadonlyArray<EntryModel>;
};

type FlashcardsState = {
  entries: ReadonlyArray<EntryModel>;
  cards: ReadonlyArray<EntryModel>;
  activeIndex: number;
};

function flashCardReducer(state: FlashcardsState, action: "next" | "previous") {
  switch (action) {
    case "next": {
      const { cards, activeIndex, entries } = state;
      const nextIndex = activeIndex + 1;
      let newCards = cards;
      if (nextIndex >= cards.length - 1) {
        const randomEntry = getRandomEntry(
          entries.filter((card) => card.id !== cards[state.activeIndex].id)
        );
        newCards = [...cards, randomEntry];
      }

      return {
        ...state,
        cards: newCards,
        activeIndex: nextIndex,
      };
    }
    case "previous":
      return {
        ...state,
        activeIndex: Math.max(state.activeIndex - 1, 0),
      };
  }
}

export function FlashcardsContainer({
  list,
  entries,
}: FlashcardsContainerProps): JSX.Element {
  const [state, dispatch] = useReducer(flashCardReducer, {
    entries,
    cards: entries.slice(0, 2),
    activeIndex: 0,
  });
  const { cards, activeIndex } = state;

  useEffect(() => {
    const handlePrev = () => dispatch("previous");
    const handleNext = () => dispatch("next");
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        handlePrev();
      }
      if (e.code === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div data-testid="flashcards" className="max-w-[500px] mx-auto">
      <h1 className="text-3xl mb-4">
        {list.name} ({entries.length} Karten)
      </h1>
      <p className="mb-4">
        Karte {activeIndex + 1}/{cards.length}
      </p>
      <div className="relative h-[210px]">
        {cards.map((entry, index) => {
          let className;
          if (index < activeIndex) {
            className = styles.previous;
          } else if (index > activeIndex) {
            className = styles.next;
          } else {
            className = styles.current;
          }

          return (
            <div key={index} className={className}>
              <FlashcardContainer entry={entry} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
