import React from "react";
import { TopicModel } from "../../services/VocabularyService";
import styles from "./Topic.module.css";

export function Topic({ value }: TopicModel): JSX.Element {
  return <span className={styles.topic}>{value}</span>;
}
