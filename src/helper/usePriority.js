function UsePriority(priority) {
  if (priority === "NO") {
    return "NORMAL";
  } else if (priority === "LO") {
    return "LOW";
  } else {
    return "HIGH";
  }
}

export default UsePriority;
