const code = {
    BACKEND: { code: 500, type: 'ERROR_BACKEND', msg: 'Error Backend!' },
    NOT_FOUND: { code: 404, type: 'NOT_FOUND' },
    UNAUTHORIZED: { code: 401, type: 'UNAUTHORIZED', msg: 'Unauthorized !' },
    FORBIDDEN: { code: 403, type: 'FORBIDDEN', msg: 'Forbidden!' },
    BAD_REQUEST: { code: 400, type: 'BAD_REQUEST' },
    LOGIN_ERROR: { code: 402, type: 'LOGIN_ERROR' },
    VALIDATION_ERROR: { code: 422, type: 'VALIDATION_ERROR' },
    WRONG_DATA: { code: 409, type: 'WRONG_DATA', msg: 'Your data is wrong!'},
    NOT_ENOUGH_DATA: { code: 410, type: 'NOT_ENOUGH_DATA', msg: 'Your data is not enough!'},

    // Custom Status Code

    // User
    USER_NOT_FOUND: { code: 1001, type: 'USER_NOT_FOUND', msg: 'User does not exist!' },
    WRONG_PASSWORD: { code: 1002, type: 'WRONG_PASSWORD', msg: 'Wrong email or password' },
    USER_UNACTIVED: { code: 1003, type: 'USER_UNACTIVED', msg: 'User unactived!' },
    TOKEN_ERROR: { code: 1004, type: 'TOKEN_ERROR', msg: 'Token error!' },
    USER_EXISTED: { code: 1005, type: 'USER_EXISTED', msg: 'User email existed!'},
    EMAIL_EXISTED: { code: 1006, type: 'EMAIL_EXISTED', msg: 'User already exists!' },
    EMAIL_NOT_EXIST: { code: 1007, type: 'EMAIL_NOT_EXIST', msg: 'Email does not exist!'  },
    TOKEN_EXPIRED: { code: 1008, type: 'TOKEN_EXPIRED' , msg: 'Token has expired'},
    RECOVERY_EXPIRED: { code: 1009, type: 'RECOVERY_EXPIRED', msg: 'Expired recovery!' },
    USER_SIGNED_IN: { code: 1010, type: 'USER_SIGNED_IN', msg: 'User signed in!' },
    NOT_HAVE_ACCESS: { code: 1010, type: 'NOT_HAVE_ACCESS', msg: 'User not have access!' },
    USER_LOCKED: { code: 1053, type: 'USER_LOCKED', msg: 'User locked!' },
    USER_INACTIVE: { code: 1054, type: 'USER_INACTIVE', msg: 'User inactived!' },

    //Categories
    CATEGORY_EXISTED: { code: 1020, type: 'CATEGORY_EXISTED', msg: 'Category name existed!' },
    CATEGORY_NOT_FOUND: { code: 1021, type: 'CATEGORY_NOT_FOUND', msg: 'Category ID does not exist!' },
    STATUS_CATEGORY_WRONG: { code: 1021, type: 'STATUS_CATEGORY_WRONG', msg: 'Status category wrong!' },

    //Posts
    POST_EXISTED: { code: 1030, type: 'POST_EXISTED', msg: 'Post name existed!' },
    POST_NOT_FOUND: { code: 1031, type: 'POST_NOT_FOUND', msg: 'Post ID does not exist!' },
    TYPE_CONTENT_NOT_FOUND: { code: 1032, type: 'TYPE_CONTENT_NOT_FOUND', msg: 'Type content wrong!' },

    // Customers
    CUSTOMER_NOT_FOUND: { code: 1040, type: 'CUSTOMER_NOT_FOUND', msg: 'Customer ID does not exist!' },
    CUSTOMER_CODE_EXISTED: { code: 1041, type: 'CUSTOMER_CODE_EXISTED', msg: 'Customer code existed!' },
    CUSTOMER_NAME_EXISTED: { code: 1042, type: 'CUSTOMER_NAME_EXISTED', msg: 'Customer name existed!' },

    // Customers
    EMPLOYEE_NOT_FOUND: { code: 1050, type: 'EMPLOYEE_NOT_FOUND', msg: 'Employee ID does not exist!' },
    EMPLOYEE_EXISTED: { code: 1051, type: 'EMPLOYEE_EXISTED', msg: 'Employee ID existed!' },
    EMPLOYEE_CODE_EXISTED: { code: 1052, type: 'EMPLOYEE_CODE_EXISTED', msg: 'Employee code existed!' },
    EMPLOYEE_LOCKED: { code: 1053, type: 'EMPLOYEE_LOCKED', msg: 'Employee locked!' },
    EMPLOYEE_SIGNED_IN: { code: 1054, type: 'EMPLOYEE_SIGNED_IN', msg: 'Employee signed in!' },
    EMPLOYEE_NOT_PENDING: { code: 1055, type: 'EMPLOYEE_NOT_PENDING', msg: 'Employee ID does not pending!' },
    
    // Location
    PROVINCE_NOT_FOUND: { code: 1060, type: 'PROVINCE_NOT_FOUND', msg: 'Province ID does not exist!' },
    DISTRICT_NOT_FOUND: { code: 1061, type: 'DISTRICT_NOT_FOUND', msg: 'District ID does not exist!' },
    WARD_NOT_FOUND: { code: 1062, type: 'WARD_NOT_FOUND', msg: 'Ward ID does not exist!' },

    // Position
    POSITION_EXISTED: { code: 1070, type: 'POSITION_EXISTED', msg: 'Position name existed!' },
    POSITION_NOT_FOUND: { code: 1071, type: 'POSITION_NOT_FOUND', msg: 'Position ID does not exist!!' },

    //History route
    ROUTE_NOT_FOUND: { code: 1080, type: 'ROUTE_NOT_FOUND', msg: 'Route history ID does not exist!' },

    //KPI
    KPI_NOT_FOUND: { code: 1090, type: 'KPI_NOT_FOUND', msg: 'KPI ID does not exist!' },
    KPI_RANK_NOT_FOUND: { code: 1091, type: 'KPI_RANK_NOT_FOUND', msg: 'KPI rank ID does not exist!' },
    EMPLOYEE_TASK_EXISTED: { code: 1092, type: 'EMPLOYEE_TASK_EXISTED', msg: 'Employee and task existed!'},
    EMPLOYEE_CUSTOMER_EXISTED: { code: 1093, type: 'EMPLOYEE_CUSTOMER_EXISTED', msg: 'Employee and customer existed!'},
    EMPLOYEE_TASK_NOT_FOUND: { code: 1094, type: 'EMPLOYEE_TASK_NOT_FOUND', msg: 'Employee and task does not exist!'},
    EMPLOYEE_CUSTOMER_NOT_FOUND: { code: 1095, type: 'EMPLOYEE_CUSTOMER_NOT_FOUND', msg: 'Employees do not manage the store!'},
    MONTH_NOT_FOUND: { code: 1096, type: 'MONTH_NOT_FOUND', msg: 'You entered the wrong month!'},
    WRONG_ID_DATE: { code: 1097, type: 'WRONG_ID_DATE', msg: 'Wrong date ID!' },
    ROUTING_NOT_FOUND: { code: 1098, type: 'ROUTING_NOT_FOUND', msg: 'Routing does not existed!'},

    // Another
    ROLE_NOT_FOUND: { code: 1100, type: 'ROLE_NOT_FOUND', msg: 'Role ID does not exist!' },
    ROLE_CAN_NOT_BE_ZERO: { code: 1101, type: 'ROLE_CAN_NOT_BE_ZERO', msg: 'Role must be greater than 0!' },
    ROLE_EXISTED: { code: 1102, type: 'ROLE_EXISTED', msg: 'Role key existed!' },
    RBAC_MODULE_EXISTED: { code: 1110, type: 'RBAC_MODULE_EXISTED', msg: 'Rbac module key existed!' },
    RBAC_ACTION_EXISTED: { code: 1111, type: 'RBAC_ACTION_EXISTED', msg: 'Rbac action key existed!' },
    RBAC_MODULE_FOUND: { code: 1112, type: 'RBAC_MODULE_FOUND', msg: 'Rbac module does not exist!' },
    RBAC_ACTION_FOUND: { code: 1113, type: 'RBAC_ACTION_FOUND', msg: 'Rbac action does not exist!' },

    //Task
    TASK_NOT_FOUND: { code: 1120, type: 'TASK_NOT_FOUND', msg: 'Task does not existed!'},
    ANSWER_LARGER_ONE: { code: 1131, type: 'ANSWER_LARGER_ONE', msg: 'Number of answers must be more than 1!' },
    DUPLICATE_ANSWER: { code: 1133, type: 'DUPLICATE_ANSWER', msg: 'Duplicate answer!' },
    NAME_TASK_EXISTED: { code: 1120, type: 'NAME_TASK_EXISTED', msg: 'Task name existed!'},
    // Target
    TARGET_NOT_FOUND: { code: 1130, type: 'TARGET_NOT_FOUND', msg: 'Target does not exist!' },
    TARGET_LARGER_STORE_MANAGER: { code: 1131, type: 'TARGET_LARGER_STORE_MANAGER', msg: 'Target is greater than the store the employee is managing!' },
    TARGET_IS_POSITIVE: { code: 1131, type: 'TARGET_IS_POSITIVE', msg: 'Target is positive number!' },

    // File
    FILE_NOT_FOUND: { code: 1140, type: 'FILE_NOT_FOUND', msg: 'File does not exist!' },

    STATUS_NOT_FOUND: { code: 1500, type: 'STATUS_NOT_FOUND', msg: 'Status does not existed!'},

  };
  export default code;
  