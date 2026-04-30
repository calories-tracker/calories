export function qualityColor(q) {
  if (q >= 80) return '#3DB46D';
  if (q >= 60) return '#F4B740';
  if (q >= 45) return '#E8954E';
  return '#E86A6A';
}

export function qualityLabel(q) {
  if (q >= 80) return 'Excellent';
  if (q >= 60) return 'Good';
  if (q >= 45) return 'Fair';
  return 'Needs work';
}
