const { test, expect } = require('@playwright/test');

test.describe('Swift Translator – Singlish to Sinhala (34 Test Cases)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
  });

  async function getElements(page) {
    const input = page.getByPlaceholder('Input Your Singlish Text Here.');
    const output = page.locator('div.whitespace-pre-wrap.overflow-y-auto').first();

    await expect(input).toBeVisible();
    await expect(output).toBeVisible();

    return { input, output };
  }

  /* =====================
     TEST DATA (FROM EXCEL)
     expected:
       - "output"  → translation should appear
       - "stable"  → app should not crash (output may be empty)
     ===================== */

  const testCases = [
    { id: 'Pos_Fun_0001', name: 'Convert a short daily statement', input: 'mama gedhara inne', expected: 'output' },
    { id: 'Pos_Fun_0002', name: 'Convert a short food request', input: 'mata kaema kanna oonee', expected: 'output' },
    { id: 'Pos_Fun_0003', name: 'Leisure plan sentence', input: 'api gedhara yamu saha passe film ekak balanavaa', expected: 'output' },
    { id: 'Pos_Fun_0004', name: 'Compound office sentence', input: 'mama office giyaa, namuth meeting eka cancel unaa', expected: 'output' },
    { id: 'Pos_Fun_0005', name: 'Future conversation phrase', input: 'api passe kathaa karamu', expected: 'output' },
    { id: 'Pos_Fun_0006', name: 'Conditional agreement', input: 'oya hari nam api dhaen yamu', expected: 'output' },
    { id: 'Pos_Fun_0007', name: 'Conditional waiting', input: 'oya enavaanam mama wait karanavaa', expected: 'output' },
    { id: 'Pos_Fun_0008', name: 'Negative condition handling', input: 'vaessa thibunath api trip eka cancel kalaa', expected: 'output' },
    { id: 'Pos_Fun_0009', name: 'Cause and effect sentence', input: 'traffic thibuna nisaa mama late unaa', expected: 'output' },
    { id: 'Pos_Fun_0010', name: 'Request for help', input: 'oya mata podi udhavvak karannada', expected: 'output' },
    { id: 'Pos_Fun_0011', name: 'Daily habit description', input: 'mama daavasakata dekparak tea bonavaa', expected: 'output' },
    { id: 'Pos_Fun_0012', name: 'Weather related sentence', input: 'adha hari lassanada vaessa vasinavaa', expected: 'output' },
    { id: 'Pos_Fun_0013', name: 'Time based activity', input: 'raatriye api bath kaamu', expected: 'output' },
    { id: 'Pos_Fun_0014', name: 'Travel intention', input: 'ada api nuwara eliya yanna hithan innavaa', expected: 'output' },
    { id: 'Pos_Fun_0015', name: 'Opinion expression', input: 'mata meeka hari lassanayi kiyala hithenavaa', expected: 'output' },
    { id: 'Pos_Fun_0016', name: 'Suggestion sentence', input: 'oya hari nam api movie ekak balanavaa', expected: 'output' },
    { id: 'Pos_Fun_0017', name: 'Invitation sentence', input: 'oya api ekka enna kemathida', expected: 'output' },
    { id: 'Pos_Fun_0018', name: 'Apology sentence', input: 'mata samavenna hari late unaa', expected: 'output' },
    { id: 'Pos_Fun_0019', name: 'Reminder sentence', input: 'oya eeka amathaka karanna epa', expected: 'output' },
    { id: 'Pos_Fun_0020', name: 'Instruction sentence', input: 'oya meeka hondatama kiyavanna', expected: 'output' },

    // Negative / robustness
    { id: 'Neg_Fun_0021', name: 'Joined words input', input: 'mamagedharainne', expected: 'stable' },
    { id: 'Neg_Fun_0022', name: 'Slang words', input: 'ela machan supiri', expected: 'stable' },
    { id: 'Neg_Fun_0023', name: 'Mixed English Sinhala', input: 'today api office yanna ona', expected: 'stable' },
    { id: 'Neg_Fun_0024', name: 'Extra spaces', input: 'mama     gedhara     inne', expected: 'stable' },
    { id: 'Neg_Fun_0025', name: 'Uppercase input', input: 'MAMA GEDHARA INNE', expected: 'stable' },
    { id: 'Neg_Fun_0026', name: 'Special characters', input: 'mama @gedhara# inne!', expected: 'stable' },
    { id: 'Neg_Fun_0027', name: 'Numeric characters', input: 'mama 2 parak call kalaa', expected: 'stable' },
    { id: 'Neg_Fun_0028', name: 'Emoji usage', input: 'mama gedhara inne 😊', expected: 'stable' },
    { id: 'Neg_Fun_0029', name: 'Very short input', input: 'hari', expected: 'stable' },
    { id: 'Neg_Fun_0030', name: 'Very long input', input: 'mama gedhara inne saha mama adha hari lassanata innavaa namuth weather eka podi avul wenavaa kiyala hithenavaa', expected: 'stable' },
    { id: 'Neg_Fun_0031', name: 'Question format', input: 'oya gedhara inne da?', expected: 'stable' },
    { id: 'Neg_Fun_0032', name: 'Command format', input: 'oya gedhara yanna', expected: 'stable' },
    { id: 'Neg_Fun_0033', name: 'Broken grammar', input: 'mama gedhara innava ona', expected: 'stable' },
    { id: 'Neg_Fun_0034', name: 'Empty-like spacing', input: '   mama inne   ', expected: 'stable' },
  ];

  /* =====================
     GENERATED TESTS (34)
     ===================== */

  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      const { input, output } = await getElements(page);

      // type instead of fill → triggers real input events
      await input.type(tc.input, { delay: 30 });

      if (tc.expected === 'output') {
        await expect.poll(
          async () => (await output.textContent())?.trim(),
          { timeout: 20000 }
        ).not.toBe('');
      } else {
        // robustness: app should remain stable
        await expect(output).toBeVisible();
      }
    });
  }

});
