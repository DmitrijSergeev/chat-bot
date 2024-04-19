import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppRootStateType } from '@/app/store'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { UnknownAction } from 'redux'

/** Кастомный useDispatch (что бы не типизировать каждый раз при вызове) */
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()

/** Кастомный useAppSelector (что бы не типизировать каждый раз при вызове) */
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
