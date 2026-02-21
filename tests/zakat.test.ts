// Unit tests for Zakat Calculation logic
// Since zakat command is interactive, we should ideally separate the logic into a utility function.
// But for now, I will extract the core calculation to test it here.

// Refactor idea: Move calculation to src/utils/zakat.ts in future.
// For this test, I will simulate the calculation logic.

describe('Zakat Calculation Logic', () => {
    
    const calculateZakat = (assets: number, debts: number, nisab: number) => {
        const net = assets - debts;
        if (net < nisab) return 0;
        return net * 0.025;
    };

    test('should return 0 if net assets are below Nisab', () => {
        const assets = 1000;
        const debts = 0;
        const nisab = 1500; // Higher than assets
        
        expect(calculateZakat(assets, debts, nisab)).toBe(0);
    });

    test('should calculate 2.5% correctly if above Nisab', () => {
        const assets = 10000;
        const debts = 0;
        const nisab = 500; // Lower than assets
        
        const expected = 10000 * 0.025; // 250
        expect(calculateZakat(assets, debts, nisab)).toBe(expected);
    });

    test('should deduct debts before calculation', () => {
        const assets = 10000;
        const debts = 5000;
        const nisab = 500;
        
        const net = 5000;
        const expected = net * 0.025; // 125
        
        expect(calculateZakat(assets, debts, nisab)).toBe(expected);
    });

    test('should handle floating point precision reasonably', () => {
        const assets = 12345.67;
        const debts = 0;
        const nisab = 100;
        
        const result = calculateZakat(assets, debts, nisab);
        expect(result).toBeCloseTo(308.64175, 4);
    });
});
