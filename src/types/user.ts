export interface UserSocialSetting {
  id: number;
  createdat: string;
  updatedat: any;
  key_: string;
  value_: string;
  subkey_: string;
  data: any;
  active: number;
  units: any;
  min: any;
  max: any;
  group_: any;
  subvalue_: any;
}

export interface UserDepositSetting {
  id: number;
  createdat: string;
  updatedat: any;
  key_: string;
  value_: string;
  subkey_: string;
  data: any;
  active: number;
  units: any;
  min: any;
  max: any;
  group_: any;
  subvalue_: any;
}

export interface UserWithdrawSetting {
  id: number;
  createdat: string;
  updatedat: any;
  key_: string;
  value_: string;
  subkey_: string;
  data: any;
  active: number;
  units: any;
  min: any;
  max: any;
  group_: any;
  subvalue_: any;
}

export interface UserInfo {
  myinfo: {
    id: number;
    createdat: string;
    updatedat: string;
    address: string;
    ip: string;
    pwhash: string;
    level: number;
    username: string;
    active: number;
    email: string;
    nickname: string;
    receiveemailnews: number;
    referercode: any;
    myreferercode: string;
    icanwithdraw: number;
    useragent: any;
    icanlogin: number;
    lastactive: string;
    countincrements: number;
    countdecrements: number;
    dob: any;
    dobunix: any;
    phonenumber: string;
    realname: any;
    uuid: string;
    nettype: string;
    usernamehash: any;
    note: any;
    preferrednetwork: any;
    useruuid: string;
    urlimage: any;
    phonecountrycode2letter: string;
    phonenationalnumber: string;
    language: any;
    isskipcreatetutorial: any;
    socialid: any;
    socialprovider: any;
    issocial: any;
    parentid: any;
    parentuuid: any;
    uselevel: any;
    prefsymbol: string;
    preferredcurrency: any;
    parentname: any;
    parentcode: any;
    lastloginstr: any;
    preferdepositcurrency: any;
    preferwithdrawcurrency: any;
  };
  account: {
    address: string;
    id: number;
    createdat: string;
    updatedat: any;
    username: string;
    nettype: string;
    currentBlockNumber: number;
    firstUsedBlockNumber: number;
    useruuid: string;
    active: number;
    currency: any;
    type: any;
  };
}
