import { beforeAll, describe, expect, it } from 'vitest';
import { withBase, stripBase } from './paths';

describe('withBase', () => {
  beforeAll(() => {
    // Simulate the GitHub Pages deployment under the /mamunknitwear/ base.
    import.meta.env.BASE_URL = '/mamunknitwear/';
  });

  it('prefixes paths with the configured base', () => {
    expect(withBase('/about-us-2/')).toBe('/mamunknitwear/about-us-2/');
    expect(withBase('/')).toBe('/mamunknitwear/');
  });

  it('normalizes paths that lack a leading slash', () => {
    expect(withBase('contact-us')).toBe('/mamunknitwear/contact-us');
  });
});

describe('stripBase', () => {
  it('removes the base prefix from a URL', () => {
    expect(stripBase('/mamunknitwear/about-us-2/')).toBe('/about-us-2/');
  });

  it('returns "/" when the path is the bare base', () => {
    expect(stripBase('/mamunknitwear/')).toBe('/');
  });

  it('leaves unrelated paths untouched', () => {
    expect(stripBase('/other/')).toBe('/other/');
  });
});
