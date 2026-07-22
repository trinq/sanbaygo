import { BUS_86, DESTINATIONS, NOI_BAI_AIRPORT, EXIT_TIME_ESTIMATES } from '../data';

describe('core data integrity', () => {
  describe('BUS_86 ticket price', () => {
    it('ticketPrice is 50000 VND per CONTEXT.md line 92', () => {
      expect(BUS_86.ticketPrice).toBe(50000);
    });
  });

  describe('DESTINATIONS coverage', () => {
    it("'other' destination exists with hasBusCoverage: false", () => {
      const other = DESTINATIONS.find(d => d.id === 'other');
      expect(other).toBeDefined();
      expect(other?.hasBusCoverage).toBe(false);
    });
  });

  describe('T1 international flight support', () => {
    it("T1 flightTypes includes 'international'", () => {
      const t1 = NOI_BAI_AIRPORT.terminals.find(t => t.id === 'T1');
      expect(t1).toBeDefined();
      expect(t1?.flightTypes).toContain('international');
    });

    it('T1 international exit-time entries exist for both baggage types', () => {
      const carryOn = EXIT_TIME_ESTIMATES.find(
        e => e.terminalType === 'domestic' && e.baggageType === 'carry_on' && e.flightType === 'international'
      );
      const checked = EXIT_TIME_ESTIMATES.find(
        e => e.terminalType === 'domestic' && e.baggageType === 'checked' && e.flightType === 'international'
      );
      expect(carryOn).toBeDefined();
      expect(checked).toBeDefined();
    });
  });

  describe('T2 international flight support', () => {
    it("T2 flightTypes includes 'international'", () => {
      const t2 = NOI_BAI_AIRPORT.terminals.find(t => t.id === 'T2');
      expect(t2).toBeDefined();
      expect(t2?.flightTypes).toContain('international');
    });

    it('T2 supports international flights only', () => {
      const t2 = NOI_BAI_AIRPORT.terminals.find(t => t.id === 'T2');
      expect(t2?.flightTypes).toEqual(['international']);
    });
  });
});
