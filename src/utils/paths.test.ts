import { beforeAll, describe, expect, it } from 'vitest';
import { withBase, stripBase } from './paths';

describe('withBase', () => {
  beforeAll(() => {
    // Simulate the custom-domain deployment (served from the domain root).
    import.meta.env.BASE_URL = '/';
  });

  it('leaves root-served paths unchanged', () => {
    expect(withBase('/about-us/')).toBe('/about-us/');
    expect(withBase('/')).toBe('/');
  });

  it('normalizes paths that lack a leading slash', () => {
    expect(withBase('contact-us')).toBe('/contact-us');
  });
});

describe('withBase (sub-path base)', () => {
  beforeAll(() => {
    // Simulate a GitHub Pages sub-path deployment (e.g. /mamunknitwear/).
    import.meta.env.BASE_URL = '/mamunknitwear/';
  });

  it('prefixes paths with the configured base', () => {
    expect(withBase('/about-us/')).toBe('/mamunknitwear/about-us/');
    expect(withBase('/')).toBe('/mamunknitwear/');
  });
});

describe('stripBase', () => {
  beforeAll(() => {
    // Simulate the custom-domain deployment (served from the domain root).
    import.meta.env.BASE_URL = '/';
  });

  it('returns root-served paths unchanged', () => {
    expect(stripBase('/about-us/')).toBe('/about-us/');
  });

  it('returns "/" for the bare root', () => {
    expect(stripBase('/')).toBe('/');
  });

  it('leaves unrelated paths untouched', () => {
    expect(stripBase('/other/')).toBe('/other/');
  });
});
