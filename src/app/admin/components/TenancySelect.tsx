'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronsUpDown, Check } from 'lucide-react'
import { Tenancy } from '@/services/clientside'
import { cn } from '@/lib/utils'

interface TenancySelectProps {
  tenancies: Tenancy[]
  selected: Tenancy | null
  onSelect: (tenancy: Tenancy) => void
}

export const TenancySelect: React.FC<TenancySelectProps> = ({
  tenancies, selected, onSelect
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredTenancies = tenancies.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-md bg-white shadow-sm text-sm"
      >
        {selected ? selected.name : 'Selecione um inquilino...'}
        <ChevronsUpDown className="w-4 h-4 ml-2 text-gray-400" />
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 mt-2 w-full rounded-md border bg-white shadow-md">
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 text-sm border-b outline-none"
          />
          <ul className="max-h-60 overflow-auto">
            {filteredTenancies.length > 0 ? (
              filteredTenancies.map((tenancy) => (
                <li
                  key={tenancy.id}
                  className="flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    onSelect(tenancy)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "w-4 h-4 mr-2",
                      selected?.id === tenancy.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tenancy.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-500">Nenhum inquilino encontrado.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
