import react, { useState } from "react";

import SmsVarification from "../../components/page/auth/smsVarification";
import GetPhoneNumber from "../../components/page/auth/getPhoneNumber";
function Auth() {
  const [isVarificatSms, setIsVarificatSms] = useState(false);

  const onGetPhoneNumberHandler = (status) => {
    setIsVarificatSms(status);
  };

  return (
    <div>
      {isVarificatSms ? (
        <SmsVarification
          onGoToGetPhoneNumberHandler={onGetPhoneNumberHandler}
        />
      ) : (
        <GetPhoneNumber getCodeHandler={onGetPhoneNumberHandler} />
      )}
    </div>
  );
}

export default Auth;
