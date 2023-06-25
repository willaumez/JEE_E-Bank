import {CustomerModel} from "./customer.model";

export interface AccountsModel {
  type:         string;
  id:           string;
  balance:      number;
  createdAt:    Date;
  status:       string;
  customerDTO:  CustomerModel;
  interestRate: number;
  overDraft: number;
}
