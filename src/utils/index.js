function compareIP(a, b) {
  if (a.id.toLowerCase() < b.id.toLowerCase()) {
    return -1;
  }
  if (a.id.toLowerCase() > b.id.toLowerCase()) {
    return 1;
  }
  return 0;
}

function compareReverseIP(a, b) {
  if (a.id.toLowerCase() < b.id.toLowerCase()) {
    return 1;
  }
  if (a.id.toLowerCase() > b.id.toLowerCase()) {
    return -1;
  }
  return 0;
}

function compareCount(a, b) {
  if (a.cnt < b.cnt) {
    return -1;
  }
  if (a.cnt > b.cnt) {
    return 1;
  }
  return 0;
}

function compareReverseCount(a, b) {
  if (a.cnt < b.cnt) {
    return 1;
  }
  if (a.cnt > b.cnt) {
    return -1;
  }
  return 0;
}

export { compareIP, compareReverseIP, compareCount, compareReverseCount };
