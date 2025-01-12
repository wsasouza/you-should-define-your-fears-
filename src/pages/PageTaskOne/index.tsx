import { useEffect, useState } from 'react'
import { Bandaids, Crosshair, Lifebuoy } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

import { CardItem } from '../../components/CardItem'
import { ItemCard } from '../../interfaces/itemCard'
import { getLastItemDate } from '../../utils/getLastItemDate'
import { initialValue } from '../../utils/initialValue'
import { CardDefineDisplay } from './components/CardDefineDisplay'
import { CardPreventDisplay } from './components/CardPreventDisplay'
import { CardRepairDisplay } from './components/CardRepairDisplay '

import {
  CardDisplayContainer,
  CardItemContainer,
  CardItemDefine,
  CardItemPrevent,
  CardItemRepair,
  PageOneContainer,
  TaskOneDisplay,
} from './styles'

const DEFINE_ITEMS = '@CodeTask1:define'
const PREVENT_ITEMS = '@CodeTask1:prevent'
const REPAIR_ITEMS = '@CodeTask1:repair'

export function PageTaskOne() {
  const [defineItems, setDefineItems] = useState<ItemCard[]>(
    initialValue(DEFINE_ITEMS),
  )
  const [preventItems, setPreventItems] = useState<ItemCard[]>(
    initialValue(PREVENT_ITEMS),
  )
  const [repairItems, setRepairItems] = useState<ItemCard[]>(
    initialValue(REPAIR_ITEMS),
  )

  const [lastDefineItemDate, setLastDefineItemDate] = useState('')
  const [lastPreventItemDate, setLastPreventItemDate] = useState('')
  const [lastRepairItemDate, setLastRepairItemDate] = useState('')

  useEffect(() => {
    localStorage.setItem(DEFINE_ITEMS, JSON.stringify(defineItems))
  }, [defineItems])

  useEffect(() => {
    localStorage.setItem(PREVENT_ITEMS, JSON.stringify(preventItems))
  }, [preventItems])

  useEffect(() => {
    localStorage.setItem(REPAIR_ITEMS, JSON.stringify(repairItems))
  }, [repairItems])

  useEffect(() => {
    setLastDefineItemDate(getLastItemDate(defineItems))
  }, [defineItems])

  useEffect(() => {
    setLastPreventItemDate(getLastItemDate(preventItems))
  }, [preventItems])

  useEffect(() => {
    setLastRepairItemDate(getLastItemDate(repairItems))
  }, [repairItems])

  function addDefineItem(newDefineItemTitle: string) {
    const defineItemSameTitle = defineItems.find(
      (item) => item.title === newDefineItemTitle,
    )

    if (defineItemSameTitle) {
      toast.warning('Este item já existe na coluna Definir.')
      return
    }

    const newDefineItem = {
      id: uuidv4(),
      title: newDefineItemTitle,
      createdAt: new Date(),
    }

    setDefineItems((oldState) => [...oldState, newDefineItem])
    toast.success('Item adicionado na tabela Definir')
  }

  function addPreventItem(newPreventItemTitle: string) {
    const preventItemSameTitle = preventItems.find(
      (item) => item.title === newPreventItemTitle,
    )

    if (preventItemSameTitle) {
      toast.warning('Este item já existe na coluna Previnir.')
      return
    }

    const newPreventItem = {
      id: uuidv4(),
      title: newPreventItemTitle,
      createdAt: new Date(),
    }

    setPreventItems((oldState) => [...oldState, newPreventItem])
    toast.success('Item adicionado na tabela Previnir')
  }

  function addRepairItem(newRepairItemTitle: string) {
    const repairItemSameTitle = repairItems.find(
      (item) => item.title === newRepairItemTitle,
    )

    if (repairItemSameTitle) {
      toast.warning('Este item já existe na coluna Reparar.')
      return
    }

    const newRepairItem = {
      id: uuidv4(),
      title: newRepairItemTitle,
      createdAt: new Date(),
    }

    setRepairItems((oldState) => [...oldState, newRepairItem])
    toast.success('Item adicionado na tabela Reparar')
  }

  async function handleRemoveDefineItem(id: string) {
    setDefineItems((oldState) => oldState.filter((item) => item.id !== id))
    toast.info('Item na coluna Definir foi removido com sucesso.')
  }

  async function handleRemovePreventItem(id: string) {
    setPreventItems((oldState) => oldState.filter((item) => item.id !== id))
    toast.info('Item na coluna Previnir foi removido com sucesso.')
  }

  function handleRemoveRepairItem(id: string) {
    setRepairItems((oldState) => oldState.filter((item) => item.id !== id))
    toast.info('Item na coluna Reparar foi removido com sucesso.')
  }

  return (
    <PageOneContainer>
      <TaskOneDisplay>
        <h1>E se eu ... ?</h1>
      </TaskOneDisplay>
      <CardDisplayContainer>
        <CardDefineDisplay
          icon={<Crosshair size={32} />}
          title="Definir"
          lastDate={lastDefineItemDate}
          addDefineItem={addDefineItem}
        />

        <CardPreventDisplay
          icon={<Lifebuoy size={32} />}
          title="Previnir"
          lastDate={lastPreventItemDate}
          addPreventItem={addPreventItem}
        />

        <CardRepairDisplay
          icon={<Bandaids size={32} />}
          title="Reparar"
          lastDate={lastRepairItemDate}
          addRepairItem={addRepairItem}
        />
      </CardDisplayContainer>
      <CardItemContainer>
        <CardItemDefine>
          {defineItems.map((item, index) => {
            return (
              <CardItem
                key={item.id}
                item={item}
                order={index + 1}
                icon={<Crosshair size={24} />}
                removeCard={handleRemoveDefineItem}
              />
            )
          })}
        </CardItemDefine>
        <CardItemPrevent>
          {preventItems.map((item, index) => {
            return (
              <CardItem
                key={item.id}
                item={item}
                order={index + 1}
                icon={<Lifebuoy size={24} />}
                removeCard={handleRemovePreventItem}
              />
            )
          })}
        </CardItemPrevent>
        <CardItemRepair>
          {repairItems.map((item, index) => {
            return (
              <CardItem
                key={item.id}
                item={item}
                order={index + 1}
                icon={<Bandaids size={24} />}
                removeCard={handleRemoveRepairItem}
              />
            )
          })}
        </CardItemRepair>
      </CardItemContainer>
    </PageOneContainer>
  )
}
