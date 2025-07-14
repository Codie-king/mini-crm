import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set) => ({
      isDarkMode: false,
      sidebarOpen: true,
      activeModal: null,
      modalData: null,

      // Actions
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      openModal: (modalType, data = null) => set({ activeModal: modalType, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
    }),
    {
      name: 'crm-ui',
      partialize: (state) => ({ isDarkMode: state.isDarkMode, sidebarOpen: state.sidebarOpen })
    }
  )
);

export default useUIStore; 