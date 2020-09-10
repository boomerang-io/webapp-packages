import React from "react";
import PropTypes from "prop-types";
import styles from "./main.module.scss";

Main.propTypes = {
  user: PropTypes.object.isRequired,
};

function Main({ user }) {

  return (
    <main id="content" className={styles.container}>
      Main Content To Be Added
    </main>
  );
}

export default Main;
