import { describe, expect, it } from 'vitest';
import { navigation, site } from './site';
import { homeFeatures, historyMilestones } from './home';
import { services } from './services';
import { knitting, digitalPrinting, sewing } from './sections';
import { clients, certifications } from './logos';

describe('site data', () => {
  it('defines a navigation entry for every migrated section', () => {
    const hrefs = navigation.flatMap((item) => [
      item.href,
      ...(item.children ?? []).map((c) => c.href),
    ]);
    expect(hrefs).toContain('/about-us/');
    expect(hrefs).toContain('/services/');
    expect(hrefs).toContain('/knitting-section/');
    expect(hrefs).toContain('/digital-printing/');
    expect(hrefs).toContain('/sewing-section/');
    expect(hrefs).toContain('/news-2/');
    expect(hrefs).toContain('/contact-us/');
  });

  it('keeps the public contact email', () => {
    expect(site.publicEmail).toMatch(/@mamunknitwear\.com$/);
  });
});

describe('home data', () => {
  it('provides six feature cards with registered icons', () => {
    expect(homeFeatures).toHaveLength(6);
    const icons = ['chart', 'tree', 'thumbs-up', 'briefcase', 'medkit'];
    for (const feature of homeFeatures) {
      expect(icons).toContain(feature.icon);
    }
  });

  it('lists the founding year first', () => {
    expect(historyMilestones[0].year).toBe('2013');
  });
});

describe('services data', () => {
  it('covers the six service cards', () => {
    expect(services).toHaveLength(6);
    expect(services.map((s) => s.title)).toContain('Knitting Section');
    expect(services.map((s) => s.title)).toContain('Embroidery');
  });
});

describe('section data', () => {
  it('has machine table totals matching the machine count', () => {
    const total = knitting.machineTable.rows.at(-1);
    expect(total?.machine).toBe('Total');
    expect(total?.nos).toBe('28');
  });

  it('lists sewing summary stats', () => {
    expect(sewing.summary.find((s) => s.label === 'Total Lines')?.value).toBe('18 Lines');
    expect(digitalPrinting.facts.length).toBeGreaterThanOrEqual(3);
  });
});

describe('logos data', () => {
  it('has client and certification logos', () => {
    expect(clients.length).toBeGreaterThanOrEqual(5);
    expect(certifications.length).toBeGreaterThanOrEqual(8);
  });
});
