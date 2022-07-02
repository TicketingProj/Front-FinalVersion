function UseStatus(status) {
  if (status === "OP") {
    return "OPEN";
  } else if (status === "CL") {
    return "ClOSE";
  } else {
    return "InProgress";
  }
}

export default UseStatus;
