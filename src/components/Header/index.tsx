import React from "react";
import { useTranslation } from "react-i18next";
import styles from "../PlayerCountInput/styles.module.css";
const Header = () => {
  const { t, i18n } = useTranslation();

  const langs = [
    { name: "English", value: "en" },
    // { name: "Deutsch", value: "de" },
    { name: "فارسی", value: "fa" },
  ];
  return (
    <select
      value={i18n.resolvedLanguage}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className={styles.select}
    >
      {langs.map((lng) => (
        <option key={lng.value} value={lng.value}>
          {lng.name}
        </option>
      ))}
    </select>
  );
};

export default Header;
