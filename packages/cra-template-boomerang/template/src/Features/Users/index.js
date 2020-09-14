import React from "react";
import PropTypes from "prop-types";
import FeatureHeader from "Components/FeatureHeader";
import styles from "./users.module.scss";

Users.propTypes = {
  user: PropTypes.object
};

function Users({ user }) {

  return (
    <FeatureHeader includeBorder className={styles.container}>
      <section>
        <h1 className={styles.title}>User</h1>
        <p className={styles.description}>User details displayed bellow</p>
      </section>
    </FeatureHeader>
  );
}

export default Users;
