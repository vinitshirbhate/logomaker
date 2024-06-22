// UpdateStorageContext.ts

import React from "react";

interface UpdateStorageContextType {
  updateStorage: any;
  setUpdateStorage?: React.Dispatch<React.SetStateAction<any>>;
}

export const UpdateStorageContext =
  React.createContext<UpdateStorageContextType>({
    updateStorage: undefined,
  });
