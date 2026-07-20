import { getSiteConfig, getAboutContent, getProjects } from '../lib/content';
import assert from 'node:assert';

function runSelfCheck() {
  console.log('Running data integrity checks...');

  //verify siteConfig
  const config = getSiteConfig();
  assert(config.name === 'ASPIRE', 'SiteConfig name mismatch');
  assert(config.nav.length === 6, 'Navbar must have 6 links');
  console.log('SiteConfig parsed and validated successfully.');

  //verify aboutContent
  const about = getAboutContent();
  assert(about.timeline.length > 0, 'About timeline must have items');
  console.log('AboutContent parsed and validated successfully.');

  //verify projects
  const projects = getProjects();
  assert(projects.length === 6, 'Must load exactly 6 projects');
  
  //verify ordering
  for (let i = 0; i < projects.length; i++) {
    assert(projects[i].order === i + 1, `Project order mismatch at index ${i}`);
  }
  console.log('All 6 Projects parsed and validated successfully.');

  console.log('All checks passed successfully!');
}

runSelfCheck();
