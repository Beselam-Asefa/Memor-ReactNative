// validation constraint for registeration 
const registerConstraints = {
    username: {
      presence: {
        message: 'cannot be blank.',
      },
      length: {
        minimum: 3,
        message: 'must be at least 3 characters',
      },
    },
    email: {
      presence: {
        message: 'cannot be blank.',
      },
      email: {
        message: 'not valid.',
      },
    },
   
    password: {
      presence: {
        message: 'cannot be blank.',
      },
      length: {
        minimum: 5,
        message: 'must be at least 5 characters',
      },
    },
    confirmPassword: {
      presence: 'cannot be blank.',
      equality: {
        attribute: 'password',
      },
    },
  };
  
  // validation constraint for photo upload 
  const uploadConstraints = {
    title: {
      presence: {
        message: 'cannot be blank.',
      },
      length: {
        minimum: 3,
        message: 'must be at least 3 characters',
      },
    },
    description: {
      format: {
        pattern: '^(.{3,})?$',
        flags: 'i',
        message: 'must be at least 3 characters',
      },
    },
  };
  // validation constraint for upload medication
  const uploadMedConstraints = {
    medicineName: {
      presence: {
        message: 'cannot be blank.',
      },
    },
    startingTime: {
      presence: {
        message: 'cannot be blank.',
      },
    },
    howmanyTimes: {
      presence: {
        message: 'cannot be blank.',
      },
    },
    timeGap: {
      presence: {
        message: 'cannot be blank.',
      },
    },
  };

  // validation constraint for  upload suppliment
  const uploadSuppConstraints = {
    supplimentName: {
      presence: {
        message: 'cannot be blank.',
      },
    },
    startingTime: {
      presence: {
        message: 'cannot be blank.',
      },
    },
    howmanyTimes: {
      presence: {
        message: 'cannot be blank.',
      },
    },
    timeGap: {
      presence: {
        message: 'cannot be blank.',
      },
    },
  };
  
  
  export {registerConstraints, uploadConstraints,uploadMedConstraints,uploadSuppConstraints};
  