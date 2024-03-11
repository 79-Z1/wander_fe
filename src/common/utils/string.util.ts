export function getShortName(name: string = 'A'): string {
  const words = name.split(' ').slice(0, 2);
  const initials = words.map(word => word[0].toUpperCase()).join('');

  return initials;
}
