import { useMemo } from "react";
import { useAppContext } from "../index";
import { PlatformRoles, TeamRoles, featurePermissionsMap } from "Config/permissionsConfig";

/**
 * Build up an array of permissions for user
 * @param {array} roles
 * @returns {array} - array of permissions
 */
function getUserPermissionList({ platformRole, teamRoles }) {
  let permissionList = [];

  // add platform role permissions
  const platformRolePermissionList = featurePermissionsMap[PlatformRoles[platformRole]];
  if (Array.isArray(platformRolePermissionList)) {
    permissionList.push(...platformRolePermissionList);
  }

  // add team role permissions
  for (let role of teamRoles) {
    const roleRermissionList = featurePermissionsMap[TeamRoles[role]];
    if (Array.isArray(roleRermissionList)) {
      permissionList.push(...roleRermissionList);
    }
  }

  // make it an unique array
  return [...new Set(permissionList)];
}

function useUserPermissions(requestedFeaturePermissions = []) {
  const { user, activeTeam } = useAppContext();
  const platformRole = user.type;
  const teamRolesStr = JSON.stringify(activeTeam?.userRoles ?? []);
  const requestedFeaturePermissionsStr = JSON.stringify(requestedFeaturePermissions);

  // build up object for easy referencing
  const userPermissionsMap = useMemo(() => {
    const userPermissionsList = getUserPermissionList({ platformRole, teamRoles: JSON.parse(teamRolesStr) });

    let userPermissionsMap = userPermissionsList.reduce((permissions, feature) => {
      permissions[feature] = true;
      return permissions;
    }, {});

    // if passed in specific permissions, just return those
    let requestedFeaturePermissions = JSON.parse(requestedFeaturePermissionsStr);
    if (Array.isArray(requestedFeaturePermissions) && requestedFeaturePermissions.length > 0) {
      userPermissionsMap = requestedFeaturePermissions.reduce((permissions, featurePermission) => {
        permissions[featurePermission] = userPermissionsMap[featurePermission] ?? false;
        return permissions;
      }, {});
    }

    return userPermissionsMap;
  }, [platformRole, teamRolesStr, requestedFeaturePermissionsStr]);

  return userPermissionsMap;
}

export default useUserPermissions;
