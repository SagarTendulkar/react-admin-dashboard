export const ROLES = {
    ADMIN: "Admin",
    MANAGER: "Manager",
    VIEWER: "Viewer",
};

export const PERMISSIONS = {
    VIEW_USERS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER],
    EDIT_USER: [ROLES.ADMIN, ROLES.MANAGER],
    DELETE_USER: [ROLES.ADMIN],
};

export const hasPermission = (role, permissionList) => {
    return permissionList.includes(role);
};