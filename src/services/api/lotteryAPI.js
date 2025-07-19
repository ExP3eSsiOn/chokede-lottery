// Lottery API Service - ตัวอย่างการเชื่อมต่อ API จริง

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.example.com';

class LotteryAPI {
  // ดึงข้อมูลหวยทั้งหมด
  async getAllLotteries() {
    try {
      const response = await fetch(`${API_BASE_URL}/lotteries`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch lotteries');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching lotteries:', error);
      throw error;
    }
  }

  // สร้างหวยใหม่
  async createLottery(lotteryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/lotteries`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category_id: lotteryData.categoryId,
          name: lotteryData.name,
          draw_time: lotteryData.drawTime,
          close_time: lotteryData.closeTime,
          price_per_unit: lotteryData.pricePerUnit,
          max_number: lotteryData.maxNumber,
          prize_structure: lotteryData.prizeStructure,
          is_active: true
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create lottery');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating lottery:', error);
      throw error;
    }
  }

  // อัพเดตหวย
  async updateLottery(lotteryId, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/lotteries/${lotteryId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Failed to update lottery');
      
      return await response.json();
    } catch (error) {
      console.error('Error updating lottery:', error);
      throw error;
    }
  }

  // ลบหวย (soft delete)
  async deleteLottery(lotteryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/lotteries/${lotteryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete lottery');
      
      return true;
    } catch (error) {
      console.error('Error deleting lottery:', error);
      throw error;
    }
  }

  // สร้างประเภทหวยใหม่
  async createCategory(categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/lottery-categories`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: categoryData.name,
          icon: categoryData.icon,
          color: categoryData.color,
          description: categoryData.description,
          sort_order: categoryData.sortOrder
        })
      });

      if (!response.ok) throw new Error('Failed to create category');
      
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // ดึงข้อมูลรอบการออกหวย
  async getLotteryRounds(lotteryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/lotteries/${lotteryId}/rounds`, {
        headers: {
          'Authorization': `Bearer ${this.getToken()}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch lottery rounds');
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching lottery rounds:', error);
      throw error;
    }
  }

  // สร้างรอบการออกหวย
  async createLotteryRound(lotteryId, roundData) {
    try {
      const response = await fetch(`${API_BASE_URL}/lotteries/${lotteryId}/rounds`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          round_number: roundData.roundNumber,
          draw_date: roundData.drawDate,
          close_date: roundData.closeDate,
          status: 'pending'
        })
      });

      if (!response.ok) throw new Error('Failed to create lottery round');
      
      return await response.json();
    } catch (error) {
      console.error('Error creating lottery round:', error);
      throw error;
    }
  }

  // Helper method to get auth token
  getToken() {
    return localStorage.getItem('authToken') || '';
  }
}

export default new LotteryAPI();