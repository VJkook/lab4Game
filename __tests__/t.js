// Предположим, что ваша функция getCurrentLevel доступна для тестирования.
const levels = [
    { name: 'Бронза', min: 0, max: 5000, percent: 7 },
    { name: 'Серебро', min: 5001, max: 15000, percent: 10 },
    { name: 'Золото', min: 15001, max: 30000, percent: 13 },
    { name: 'Платина', min: 30001, max: Infinity, percent: 15 }
  ];
  
  function getCurrentLevel(amount) {
    return levels.find(level => amount >= level.min && amount <= level.max);
  }
  
  describe('getCurrentLevel', () => {
    it('should return correct level for given amount', () => {
      // Тестирование с различными значениями
      expect(getCurrentLevel(0).name).toBe('Бронза');
      expect(getCurrentLevel(5000).name).toBe('Бронза');
      expect(getCurrentLevel(5001).name).toBe('Серебро');
      expect(getCurrentLevel(15000).name).toBe('Серебро');
      expect(getCurrentLevel(15001).name).toBe('Золото');
      expect(getCurrentLevel(30000).name).toBe('Золото');
      expect(getCurrentLevel(30001).name).toBe('Платина');
    });
  
    it('should handle edge cases correctly', () => {
      // Дополнительные тесты для граничных значений
      expect(getCurrentLevel(4999).name).toBe('Бронза'); // на границе
      expect(getCurrentLevel(15001).name).toBe('Золото'); // на границе
      expect(getCurrentLevel(15000).name).toBe('Серебро'); // на границе
      expect(getCurrentLevel(5001).name).toBe('Серебро'); // на границе
    });
  });
  