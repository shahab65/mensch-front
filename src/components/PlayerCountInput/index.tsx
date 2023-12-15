import React from "react";
import styles from "./styles.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const PlayerCountInput = (props: Props) => {
  const { value, onChange } = props;
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
    </select>
  );
};

export default PlayerCountInput;
