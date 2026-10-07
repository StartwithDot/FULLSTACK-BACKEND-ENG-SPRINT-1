export function parseStudentId(value) {
  if (!/^BE(?:0[1-9]|10)$/.test(value ?? '')) {
    throw new Error('Supply one student ID from BE01 through BE10.');
  }
  return value;
}

export function testDatabaseUrl(value, required = false) {
  if (!value) {
    if (required)
      throw new Error(
        'Configure TEST_DATABASE_URL for a dedicated database ending in _test.',
      );
    return undefined;
  }
  let valid = false;
  try {
    const url = new URL(value);
    valid =
      !value.includes('REPLACE_LOCALLY') &&
      ['postgres:', 'postgresql:'].includes(url.protocol) &&
      decodeURIComponent(url.pathname).endsWith('_test');
  } catch {
    /* Do not include a secret URL in the error. */
  }
  if (!valid)
    throw new Error(
      'TEST_DATABASE_URL must use PostgreSQL and a dedicated database ending in _test.',
    );
  return value;
}

export function studentAppEnvironment(student, original) {
  const id = parseStudentId(student);
  const environment = {
    ...original,
    DATABASE_SCHEMA: 'lab_' + id.toLowerCase(),
  };
  delete environment.DATABASE_URL;
  const connection = testDatabaseUrl(original.TEST_DATABASE_URL);
  if (connection) environment.DATABASE_URL = connection;
  return environment;
}
