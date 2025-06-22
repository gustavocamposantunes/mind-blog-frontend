import { describe, expect, it } from 'vitest';

import { formatDateToShortMonth } from './dateFormatter';

describe("dateFormatter", () => {
  describe("formatDateToShortMoth", () => {
    it("should format date to short month", () => {
      const date = "2023-10-01T00:00:00Z";
      const formattedDate = formatDateToShortMonth(date);
      expect(formattedDate).toBe("Out 1, 2023");
    });

    it("should capitalize the first letter of the formatted date", () => {
      const date = "2023-10-01T00:00:00Z";
      const formattedDate = formatDateToShortMonth(date);
      expect(formattedDate.charAt(0)).toBe("O");
    });
  });
});