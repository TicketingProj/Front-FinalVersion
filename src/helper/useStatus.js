function UseStatus(status) {
  if (status === "OP") {
    return "OPEN";
  } else if (status === "CL") {
    return "ClOSE";
  }
  //need another status
}

export default UseStatus;
