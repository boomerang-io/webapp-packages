import React from "react";
import FeatureHeader from "Components/FeatureHeader";
import styles from "./teams.module.scss";

function Teams() {
  return (
    <>
    <FeatureHeader includeBorder className={styles.container}>
      <section>
        <h1 className={styles.title}>Teams</h1>
        <p className={styles.description}>Teams details displayed bellow</p>
      </section>
    </FeatureHeader>
    </>
  );
}

export default Teams;
